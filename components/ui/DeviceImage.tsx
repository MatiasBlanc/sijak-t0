import Image from 'next/image';
import { media } from '@/lib/media';

interface DeviceImageProps {
  className?: string;
}

/** Render decorativo del sensor compartido entre todos los sistemas. */
export function DeviceImage({ className }: DeviceImageProps) {
  return (
    <Image
      src={media.product}
      alt=""
      width={1200}
      height={1200}
      sizes="(max-width: 680px) 40vw, 20vw"
      className={className}
      loading="lazy"
    />
  );
}
