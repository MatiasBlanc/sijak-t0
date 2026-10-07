import Image from 'next/image';

interface DeviceImageProps {
  className?: string;
}

/** Ilustración decorativa del sensor. El SVG se sirve tal cual para no pasar por el optimizador. */
export function DeviceImage({ className }: DeviceImageProps) {
  return (
    <Image src="/device.svg" alt="" width={520} height={350} className={className} unoptimized />
  );
}
