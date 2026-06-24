# TurboGixxer Media CDN Setup

TurboGixxer site media is stored in the private S3 bucket:

```txt
s3://tgx-prod-media-419130719494
```

The bucket stores public frontend assets under stable prefixes such as:

- `brand/`
- `gallery/`
- `services/`
- `products/`
- `videos/`
- `pdfs/`

CloudFront is the public delivery layer in front of that bucket. The public media hostname is:

```txt
https://media.turbogixxertuning.com
```

The delivery path is:

```txt
media.turbogixxertuning.com -> CloudFront -> private S3 bucket -> tgx-prod-media-419130719494
```

## Why The Domain Exists

The frontend should reference a stable public media base URL instead of raw S3 object URLs. This keeps image, video, PDF, and product media paths clean and gives TurboGixxer one media domain that can move between AWS resources later without changing site content.

Use this in the Next.js environment:

```txt
NEXT_PUBLIC_MEDIA_BASE_URL=https://media.turbogixxertuning.com
```

The current frontend media helper in `src/lib/media.ts` already reads `NEXT_PUBLIC_MEDIA_BASE_URL`.

## Why S3 Stays Private

The bucket should not be public. CloudFront uses Origin Access Control to read objects from S3, and the S3 bucket policy allows reads only from the approved CloudFront distribution.

Expected behavior:

- `https://media.turbogixxertuning.com/path/to/file` returns `200` for valid public media.
- `https://tgx-prod-media-419130719494.s3.us-west-2.amazonaws.com/path/to/file` returns `403` for the same object.

This prevents raw bucket access while keeping the public site media available through CloudFront.

## Authenticate AWS CLI On macOS

Install or confirm AWS CLI:

```bash
aws --version
```

Authenticate with the configured SSO profile:

```bash
aws sso login --profile tgx-admin
```

Confirm the active account:

```bash
aws sts get-caller-identity --profile tgx-admin
```

The account ID must be:

```txt
419130719494
```

## Run Verification

The verification script is read-only for AWS resources. It checks AWS account identity, S3, CloudFront, Route 53, CloudFront delivery, raw S3 blocking, and regenerates `docs/media-url-map.md` from objects found in S3.

```bash
chmod +x scripts/verify-media-cdn.sh scripts/setup-media-cdn.sh
./scripts/verify-media-cdn.sh
```

Successful verification means:

- the S3 bucket exists
- expected media prefixes can be listed
- a CloudFront distribution serves `media.turbogixxertuning.com`
- the distribution origin points at `tgx-prod-media-419130719494`
- Route 53 A and AAAA aliases point to that CloudFront distribution
- a real media URL returns `200` through CloudFront
- the matching raw S3 URL returns `403`

## Run Setup

Only run setup if verification shows the CDN is missing or misconfigured:

```bash
./scripts/setup-media-cdn.sh
```

The setup script is idempotent where practical. It will:

- verify the AWS account
- reuse the existing S3 bucket
- enable S3 Block Public Access
- create or reuse an ACM certificate in `us-east-1`
- create DNS validation records in Route 53
- create or reuse CloudFront Origin Access Control
- create or reuse a CloudFront distribution for `media.turbogixxertuning.com`
- attach the ACM certificate
- keep allowed methods to `GET` and `HEAD`
- redirect HTTP to HTTPS
- update the bucket policy for CloudFront-only object reads
- create or update Route 53 A and AAAA aliases
- wait for CloudFront deployment when practical

If the script finds an existing distribution with extra aliases, multiple origins, or ordered cache behaviors, it stops for manual review and prints the exact inspection command.

After setup completes, rerun:

```bash
./scripts/verify-media-cdn.sh
```

## Manual HTTP Tests

Test CloudFront delivery:

```bash
curl -I https://media.turbogixxertuning.com/services/featuredbuild-01.webp
```

Expected result for an existing object:

```txt
HTTP/2 200
```

Confirm raw S3 access is blocked:

```bash
curl -I https://tgx-prod-media-419130719494.s3.us-west-2.amazonaws.com/services/featuredbuild-01.webp
```

Expected result:

```txt
HTTP/1.1 403 Forbidden
```

## Frontend Media References

Frontend code should build media URLs from centralized content and helpers, not hardcoded raw S3 paths.

Use:

```txt
NEXT_PUBLIC_MEDIA_BASE_URL=https://media.turbogixxertuning.com
```

Then reference media with stable paths such as:

```ts
mediaUrl("/services/featuredbuild-01.webp")
mediaUrl("/gallery/blue-c10-lowered.png")
```
