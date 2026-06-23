import { mediaUrl } from "@/lib/media";

export const heroMedia = {
  title: "Hub dyno calibration placeholder",
  image: mediaUrl("/hero/turbogixxer-r32-dark.png")
} as const;

export const galleryItems = [
  {
    title: "Mainline hub dyno",
    image: mediaUrl("/gallery/mainline-hub.png"),
    summary: "Dyno cell and controlled-load tuning texture."
  },
  {
    title: "ECU setup bench",
    image: mediaUrl("/gallery/ecu-bench.png"),
    summary: "Standalone setup, wiring, and laptop review."
  },
  {
    title: "Logging pass review",
    image: mediaUrl("/gallery/logging-pass.png"),
    summary: "Road data and revision-ready log review."
  },
  {
    title: "Harness inspection",
    image: mediaUrl("/gallery/harness-inspection.png"),
    summary: "Sensor, CAN, and harness readiness."
  },
  {
    title: "Track calibration notes",
    image: mediaUrl("/gallery/track-notes.png"),
    summary: "Technical notes for future case studies."
  },
  {
    title: "Final drive validation",
    image: mediaUrl("/gallery/drive-validation.png"),
    summary: "Drivability and confidence beyond the dyno."
  }
] as const;
