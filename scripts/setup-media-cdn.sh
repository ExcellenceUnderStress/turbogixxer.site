#!/usr/bin/env bash
set -euo pipefail

PROFILE="tgx-admin"
ACCOUNT_ID="419130719494"
REGION="us-west-2"
CERT_REGION="us-east-1"
BUCKET="tgx-prod-media-419130719494"
MEDIA_DOMAIN="media.turbogixxertuning.com"
HOSTED_ZONE_NAME="turbogixxertuning.com"
OAC_NAME="tgx-prod-media-oac"
ORIGIN_ID="s3-tgx-prod-media-419130719494"
CLOUDFRONT_ZONE_ID="Z2FDTNDATAQYW2"
CACHE_POLICY_ID="658327ea-f89d-4fab-a63d-7e88639e58f6"

info() {
  printf "\n==> %s\n" "$1"
}

pass() {
  printf "OK: %s\n" "$1"
}

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf "Missing required command: %s\n" "$1" >&2
    exit 1
  fi
}

aws_cli() {
  aws --profile "$PROFILE" "$@"
}

url_encode_path() {
  python3 - "$1" <<'PY'
import sys
import urllib.parse

print(urllib.parse.quote(sys.argv[1], safe="/-_.~"))
PY
}

get_hosted_zone_id() {
  aws_cli route53 list-hosted-zones-by-name \
    --dns-name "${HOSTED_ZONE_NAME}." \
    --query "HostedZones[?Name=='${HOSTED_ZONE_NAME}.' && Config.PrivateZone==\`false\`].Id | [0]" \
    --output text
}

write_change_batch_for_record() {
  local name="$1"
  local type="$2"
  local value="$3"
  local output_file="$4"

  python3 - "$name" "$type" "$value" > "$output_file" <<'PY'
import json
import sys

name, record_type, value = sys.argv[1:4]

change_batch = {
    "Comment": f"Validate ACM certificate for {name}",
    "Changes": [
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": name,
                "Type": record_type,
                "TTL": 300,
                "ResourceRecords": [{"Value": value}],
            },
        }
    ],
}

json.dump(change_batch, sys.stdout, indent=2)
PY
}

write_route53_alias_batch() {
  local distribution_domain="$1"
  local output_file="$2"

  python3 - "$MEDIA_DOMAIN" "$distribution_domain" "$CLOUDFRONT_ZONE_ID" > "$output_file" <<'PY'
import json
import sys

media_domain, distribution_domain, cloudfront_zone_id = sys.argv[1:4]

changes = []
for record_type in ("A", "AAAA"):
    changes.append({
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": media_domain,
            "Type": record_type,
            "AliasTarget": {
                "HostedZoneId": cloudfront_zone_id,
                "DNSName": distribution_domain,
                "EvaluateTargetHealth": False,
            },
        },
    })

json.dump({
    "Comment": f"Point {media_domain} to CloudFront",
    "Changes": changes,
}, sys.stdout, indent=2)
PY
}

find_distribution_by_alias() {
  local json_file="$1"

  python3 - "$json_file" "$MEDIA_DOMAIN" "$BUCKET" <<'PY'
import json
import sys

json_file, media_domain, bucket = sys.argv[1:4]

with open(json_file, "r", encoding="utf-8") as handle:
    data = json.load(handle)

for distribution in data.get("DistributionList", {}).get("Items", []) or []:
    aliases = distribution.get("Aliases", {}).get("Items", []) or []
    if media_domain not in aliases:
        continue

    origins = distribution.get("Origins", {}).get("Items", []) or []
    origin_match = any(bucket in origin.get("DomainName", "") for origin in origins)
    print("|".join([
        distribution.get("Id", ""),
        distribution.get("DomainName", ""),
        "yes" if origin_match else "no",
    ]))
    raise SystemExit(0)

print("||no")
PY
}

write_oac_config() {
  local output_file="$1"

  python3 - "$OAC_NAME" > "$output_file" <<'PY'
import json
import sys

name = sys.argv[1]

json.dump({
    "Name": name,
    "Description": "TurboGixxer media bucket access for CloudFront",
    "SigningProtocol": "sigv4",
    "SigningBehavior": "always",
    "OriginAccessControlOriginType": "s3",
}, sys.stdout, indent=2)
PY
}

write_distribution_config() {
  local certificate_arn="$1"
  local oac_id="$2"
  local output_file="$3"

  python3 - "$MEDIA_DOMAIN" "$BUCKET" "$REGION" "$ORIGIN_ID" "$certificate_arn" "$oac_id" "$CACHE_POLICY_ID" > "$output_file" <<'PY'
import json
import sys
import time

media_domain, bucket, region, origin_id, certificate_arn, oac_id, cache_policy_id = sys.argv[1:8]

config = {
    "CallerReference": f"tgx-media-cdn-{int(time.time())}",
    "Aliases": {"Quantity": 1, "Items": [media_domain]},
    "DefaultRootObject": "",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": origin_id,
                "DomainName": f"{bucket}.s3.{region}.amazonaws.com",
                "OriginPath": "",
                "CustomHeaders": {"Quantity": 0},
                "S3OriginConfig": {"OriginAccessIdentity": ""},
                "ConnectionAttempts": 3,
                "ConnectionTimeout": 10,
                "OriginAccessControlId": oac_id,
            }
        ],
    },
    "OriginGroups": {"Quantity": 0},
    "DefaultCacheBehavior": {
        "TargetOriginId": origin_id,
        "TrustedSigners": {"Enabled": False, "Quantity": 0},
        "TrustedKeyGroups": {"Enabled": False, "Quantity": 0},
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]},
        },
        "SmoothStreaming": False,
        "Compress": True,
        "LambdaFunctionAssociations": {"Quantity": 0},
        "FunctionAssociations": {"Quantity": 0},
        "FieldLevelEncryptionId": "",
        "CachePolicyId": cache_policy_id,
    },
    "CacheBehaviors": {"Quantity": 0},
    "CustomErrorResponses": {"Quantity": 0},
    "Comment": "TurboGixxer public media CDN",
    "Logging": {"Enabled": False, "IncludeCookies": False, "Bucket": "", "Prefix": ""},
    "PriceClass": "PriceClass_All",
    "Enabled": True,
    "ViewerCertificate": {
        "ACMCertificateArn": certificate_arn,
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021",
        "Certificate": certificate_arn,
        "CertificateSource": "acm",
    },
    "Restrictions": {"GeoRestriction": {"RestrictionType": "none", "Quantity": 0}},
    "WebACLId": "",
    "HttpVersion": "http2",
    "IsIPV6Enabled": True,
}

json.dump(config, sys.stdout, indent=2)
PY
}

normalize_distribution_config() {
  local wrapper_file="$1"
  local certificate_arn="$2"
  local oac_id="$3"
  local output_file="$4"

  python3 - "$wrapper_file" "$MEDIA_DOMAIN" "$BUCKET" "$REGION" "$ORIGIN_ID" "$certificate_arn" "$oac_id" "$CACHE_POLICY_ID" "$output_file" <<'PY'
import copy
import json
import sys

(
    wrapper_file,
    media_domain,
    bucket,
    region,
    origin_id,
    certificate_arn,
    oac_id,
    cache_policy_id,
    output_file,
) = sys.argv[1:10]

with open(wrapper_file, "r", encoding="utf-8") as handle:
    wrapper = json.load(handle)

config = wrapper["DistributionConfig"]
original = copy.deepcopy(config)

aliases = config.get("Aliases", {}).get("Items", []) or []
extra_aliases = [alias for alias in aliases if alias != media_domain]
origins = config.get("Origins", {}).get("Items", []) or []
cache_behaviors = config.get("CacheBehaviors", {}).get("Items", []) or []

if extra_aliases or len(origins) > 1 or cache_behaviors:
    print("manual", file=sys.stdout)
    print("Manual review required before changing this existing distribution.", file=sys.stderr)
    print(f"Distribution has extra aliases: {extra_aliases}", file=sys.stderr)
    print(f"Origin count: {len(origins)}; ordered cache behavior count: {len(cache_behaviors)}", file=sys.stderr)
    print("Inspect it with:", file=sys.stderr)
    print("aws --profile tgx-admin cloudfront get-distribution-config --id DISTRIBUTION_ID", file=sys.stderr)
    raise SystemExit(0)

config["Aliases"] = {"Quantity": 1, "Items": [media_domain]}
config["DefaultRootObject"] = ""
config["Origins"] = {
    "Quantity": 1,
    "Items": [
        {
            "Id": origin_id,
            "DomainName": f"{bucket}.s3.{region}.amazonaws.com",
            "OriginPath": "",
            "CustomHeaders": {"Quantity": 0},
            "S3OriginConfig": {"OriginAccessIdentity": ""},
            "ConnectionAttempts": 3,
            "ConnectionTimeout": 10,
            "OriginAccessControlId": oac_id,
        }
    ],
}
config["OriginGroups"] = {"Quantity": 0}
config["DefaultCacheBehavior"] = {
    "TargetOriginId": origin_id,
    "TrustedSigners": {"Enabled": False, "Quantity": 0},
    "TrustedKeyGroups": {"Enabled": False, "Quantity": 0},
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"],
        "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]},
    },
    "SmoothStreaming": False,
    "Compress": True,
    "LambdaFunctionAssociations": {"Quantity": 0},
    "FunctionAssociations": {"Quantity": 0},
    "FieldLevelEncryptionId": "",
    "CachePolicyId": cache_policy_id,
}
config["CacheBehaviors"] = {"Quantity": 0}
config["CustomErrorResponses"] = {"Quantity": 0}
config["Comment"] = config.get("Comment") or "TurboGixxer public media CDN"
config["Logging"] = {"Enabled": False, "IncludeCookies": False, "Bucket": "", "Prefix": ""}
config["Enabled"] = True
config["ViewerCertificate"] = {
    "ACMCertificateArn": certificate_arn,
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021",
    "Certificate": certificate_arn,
    "CertificateSource": "acm",
}
config["Restrictions"] = {"GeoRestriction": {"RestrictionType": "none", "Quantity": 0}}
config["WebACLId"] = config.get("WebACLId", "")
config["HttpVersion"] = "http2"
config["IsIPV6Enabled"] = True

if config == original:
    print("unchanged")
else:
    with open(output_file, "w", encoding="utf-8") as handle:
        json.dump(config, handle, indent=2)
    print("changed")
PY
}

write_bucket_policy() {
  local distribution_id="$1"
  local output_file="$2"

  python3 - "$ACCOUNT_ID" "$BUCKET" "$distribution_id" > "$output_file" <<'PY'
import json
import sys

account_id, bucket, distribution_id = sys.argv[1:4]

policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipalReadOnly",
            "Effect": "Allow",
            "Principal": {"Service": "cloudfront.amazonaws.com"},
            "Action": "s3:GetObject",
            "Resource": f"arn:aws:s3:::{bucket}/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": f"arn:aws:cloudfront::{account_id}:distribution/{distribution_id}"
                }
            },
        }
    ],
}

json.dump(policy, sys.stdout, indent=2)
PY
}

route53_aliases_match() {
  local zone_id="$1"
  local distribution_domain="$2"

  python3 - "$zone_id" "$MEDIA_DOMAIN" "$distribution_domain" "$PROFILE" <<'PY'
import json
import subprocess
import sys

zone_id, media_domain, distribution_domain, profile = sys.argv[1:5]
expected = distribution_domain.rstrip(".")

result = subprocess.run(
    [
        "aws",
        "--profile",
        profile,
        "route53",
        "list-resource-record-sets",
        "--hosted-zone-id",
        zone_id,
        "--output",
        "json",
    ],
    check=True,
    capture_output=True,
    text=True,
)

records = json.loads(result.stdout).get("ResourceRecordSets", []) or []

def normalize(value):
    value = (value or "").rstrip(".")
    if value.startswith("dualstack."):
        value = value[len("dualstack."):]
    return value

for record_type in ("A", "AAAA"):
    found = False
    for record in records:
        if record.get("Name") != f"{media_domain}." or record.get("Type") != record_type:
            continue
        found = True
        target = normalize((record.get("AliasTarget", {}) or {}).get("DNSName"))
        if target != expected:
            print("no")
            raise SystemExit(0)
    if not found:
        print("no")
        raise SystemExit(0)

print("yes")
PY
}

info "Checking local tools"
need_cmd aws
need_cmd python3
need_cmd curl

info "Verifying AWS account"
account="$(aws_cli sts get-caller-identity --query Account --output text)"
if [[ "$account" != "$ACCOUNT_ID" ]]; then
  printf "AWS profile %s is using account %s, expected %s\n" "$PROFILE" "$account" "$ACCOUNT_ID" >&2
  exit 1
fi
pass "AWS profile $PROFILE is using account $ACCOUNT_ID"

info "Checking S3 bucket"
aws_cli s3api head-bucket --bucket "$BUCKET" --region "$REGION" >/dev/null
pass "Using existing bucket s3://$BUCKET"

info "Finding Route 53 hosted zone"
hosted_zone_id="$(get_hosted_zone_id)"
if [[ -z "$hosted_zone_id" || "$hosted_zone_id" == "None" ]]; then
  printf "Could not find public Route 53 hosted zone: %s\n" "$HOSTED_ZONE_NAME" >&2
  exit 1
fi
hosted_zone_id="${hosted_zone_id#/hostedzone/}"
pass "Using hosted zone $hosted_zone_id"

info "Keeping S3 bucket private"
aws_cli s3api put-public-access-block \
  --bucket "$BUCKET" \
  --region "$REGION" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
pass "S3 Block Public Access is enabled for $BUCKET"

info "Finding or requesting ACM certificate in $CERT_REGION"
certificate_arn="$(aws_cli acm list-certificates \
  --region "$CERT_REGION" \
  --certificate-statuses ISSUED PENDING_VALIDATION \
  --query "CertificateSummaryList[?DomainName=='${MEDIA_DOMAIN}'].CertificateArn | [0]" \
  --output text)"

if [[ -z "$certificate_arn" || "$certificate_arn" == "None" ]]; then
  certificate_arn="$(aws_cli acm request-certificate \
    --region "$CERT_REGION" \
    --domain-name "$MEDIA_DOMAIN" \
    --validation-method DNS \
    --idempotency-token "tgxmedia419130719494" \
    --query CertificateArn \
    --output text)"
  pass "Requested ACM certificate: $certificate_arn"
else
  pass "Reusing ACM certificate: $certificate_arn"
fi

certificate_status="$(aws_cli acm describe-certificate \
  --region "$CERT_REGION" \
  --certificate-arn "$certificate_arn" \
  --query Certificate.Status \
  --output text)"

if [[ "$certificate_status" != "ISSUED" ]]; then
  info "Creating ACM DNS validation record"
  validation_name=""
  validation_type=""
  validation_value=""

  for _ in {1..20}; do
    cert_tmp="$(mktemp)"
    aws_cli acm describe-certificate \
      --region "$CERT_REGION" \
      --certificate-arn "$certificate_arn" \
      --output json > "$cert_tmp"

    validation_line="$(python3 - "$cert_tmp" <<'PY'
import json
import sys

with open(sys.argv[1], "r", encoding="utf-8") as handle:
    cert = json.load(handle)["Certificate"]

for option in cert.get("DomainValidationOptions", []) or []:
    record = option.get("ResourceRecord")
    if record:
        print("\t".join([record["Name"], record["Type"], record["Value"]]))
        raise SystemExit(0)
PY
)"
    rm -f "$cert_tmp"

    if [[ -n "$validation_line" ]]; then
      IFS=$'\t' read -r validation_name validation_type validation_value <<< "$validation_line"
      break
    fi

    sleep 5
  done

  if [[ -z "$validation_name" || -z "$validation_type" || -z "$validation_value" ]]; then
    printf "ACM did not provide a DNS validation record yet. Re-run this script in a minute.\n" >&2
    exit 1
  fi

  validation_batch="$(mktemp)"
  write_change_batch_for_record "$validation_name" "$validation_type" "$validation_value" "$validation_batch"
  aws_cli route53 change-resource-record-sets \
    --hosted-zone-id "$hosted_zone_id" \
    --change-batch "file://$validation_batch" >/dev/null
  rm -f "$validation_batch"
  pass "Upserted ACM DNS validation record: $validation_name"

  info "Waiting for ACM certificate validation"
  if ! aws_cli acm wait certificate-validated \
    --region "$CERT_REGION" \
    --certificate-arn "$certificate_arn"; then
    printf "Certificate validation is still pending. Re-run this script after DNS validation completes.\n" >&2
    exit 1
  fi
fi
pass "ACM certificate is issued"

info "Finding or creating CloudFront Origin Access Control"
oac_id="$(aws_cli cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?Name=='${OAC_NAME}'].Id | [0]" \
  --output text)"

if [[ -z "$oac_id" || "$oac_id" == "None" ]]; then
  oac_config="$(mktemp)"
  write_oac_config "$oac_config"
  oac_id="$(aws_cli cloudfront create-origin-access-control \
    --origin-access-control-config "file://$oac_config" \
    --query OriginAccessControl.Id \
    --output text)"
  rm -f "$oac_config"
  pass "Created Origin Access Control: $oac_id"
else
  pass "Reusing Origin Access Control: $oac_id"
fi

info "Finding or creating CloudFront distribution"
cf_tmp="$(mktemp)"
aws_cli cloudfront list-distributions --output json > "$cf_tmp"
distribution_line="$(find_distribution_by_alias "$cf_tmp")"
rm -f "$cf_tmp"
IFS='|' read -r distribution_id distribution_domain origin_matches <<< "$distribution_line"

if [[ -n "$distribution_id" ]]; then
  pass "Reusing CloudFront distribution: $distribution_id ($distribution_domain)"

  wrapper_file="$(mktemp)"
  updated_config_file="$(mktemp)"
  aws_cli cloudfront get-distribution-config --id "$distribution_id" --output json > "$wrapper_file"
  etag="$(python3 - "$wrapper_file" <<'PY'
import json
import sys

with open(sys.argv[1], "r", encoding="utf-8") as handle:
    print(json.load(handle)["ETag"])
PY
)"

  config_state="$(normalize_distribution_config "$wrapper_file" "$certificate_arn" "$oac_id" "$updated_config_file")"
  if [[ "$config_state" == "manual" ]]; then
    printf "This distribution needs manual review before the script changes it.\n" >&2
    printf "Exact inspection command:\n" >&2
    printf "aws --profile %s cloudfront get-distribution-config --id %s\n" "$PROFILE" "$distribution_id" >&2
    exit 1
  elif [[ "$config_state" == "changed" ]]; then
    aws_cli cloudfront update-distribution \
      --id "$distribution_id" \
      --if-match "$etag" \
      --distribution-config "file://$updated_config_file" >/dev/null
    pass "Updated CloudFront distribution settings"
    distribution_domain="$(aws_cli cloudfront get-distribution \
      --id "$distribution_id" \
      --query Distribution.DomainName \
      --output text)"
  else
    pass "CloudFront distribution settings already match the media CDN requirements"
  fi

  rm -f "$wrapper_file" "$updated_config_file"
else
  distribution_config="$(mktemp)"
  write_distribution_config "$certificate_arn" "$oac_id" "$distribution_config"
  create_output="$(aws_cli cloudfront create-distribution \
    --distribution-config "file://$distribution_config" \
    --output json)"
  rm -f "$distribution_config"

  distribution_id="$(python3 -c 'import json, sys; print(json.load(sys.stdin)["Distribution"]["Id"])' <<< "$create_output")"
  distribution_domain="$(python3 -c 'import json, sys; print(json.load(sys.stdin)["Distribution"]["DomainName"])' <<< "$create_output")"
  pass "Created CloudFront distribution: $distribution_id ($distribution_domain)"
fi

info "Updating S3 bucket policy for CloudFront-only reads"
bucket_policy_file="$(mktemp)"
write_bucket_policy "$distribution_id" "$bucket_policy_file"
aws_cli s3api put-bucket-policy \
  --bucket "$BUCKET" \
  --region "$REGION" \
  --policy "file://$bucket_policy_file"
rm -f "$bucket_policy_file"
pass "Bucket policy allows reads from CloudFront distribution $distribution_id"

info "Creating or updating Route 53 aliases"
if [[ "$(route53_aliases_match "$hosted_zone_id" "$distribution_domain")" == "yes" ]]; then
  pass "Route 53 A and AAAA aliases already point to $distribution_domain"
else
  alias_batch="$(mktemp)"
  write_route53_alias_batch "$distribution_domain" "$alias_batch"
  aws_cli route53 change-resource-record-sets \
    --hosted-zone-id "$hosted_zone_id" \
    --change-batch "file://$alias_batch" >/dev/null
  rm -f "$alias_batch"
  pass "Upserted Route 53 A and AAAA aliases for $MEDIA_DOMAIN"
fi

info "Waiting for CloudFront deployment"
if ! aws_cli cloudfront wait distribution-deployed --id "$distribution_id"; then
  printf "CloudFront is still deploying. Check status with:\n" >&2
  printf "aws --profile %s cloudfront get-distribution --id %s --query Distribution.Status --output text\n" "$PROFILE" "$distribution_id" >&2
  exit 1
fi
pass "CloudFront distribution is deployed"

info "Final test URLs"
sample_key="$(aws_cli s3api list-objects-v2 \
  --bucket "$BUCKET" \
  --prefix "services/" \
  --query 'Contents[?Size > `0`].Key | [0]' \
  --output text)"

if [[ -z "$sample_key" || "$sample_key" == "None" ]]; then
  sample_key="$(aws_cli s3api list-objects-v2 \
    --bucket "$BUCKET" \
    --query 'Contents[?Size > `0`].Key | [0]' \
    --output text)"
fi

if [[ -n "$sample_key" && "$sample_key" != "None" ]]; then
  encoded_key="$(url_encode_path "$sample_key")"
  printf "CloudFront: https://%s/%s\n" "$MEDIA_DOMAIN" "$encoded_key"
  printf "Raw S3:     https://%s.s3.%s.amazonaws.com/%s\n" "$BUCKET" "$REGION" "$encoded_key"
else
  printf "No media object found for a final URL sample.\n"
fi

printf "\nSetup complete. Run ./scripts/verify-media-cdn.sh to confirm the CDN path end to end.\n"
