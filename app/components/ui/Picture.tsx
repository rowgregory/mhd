import Image, { type ImageProps } from "next/image";
import { type FC, memo, type MouseEventHandler } from "react";

type CommonProps = {
  src: string;
  /** Required. Use "" for purely decorative images. */
  alt: string;
  className?: string;
  priority?: boolean;
  onClick?: MouseEventHandler<HTMLImageElement>;
  quality?: number;
  placeholder?: "empty" | "blur";
  blurDataURL?: string;
  sizes?: string;
};

/* Discriminated union: either fill, OR width+height — never ambiguous. */
type FillProps = CommonProps & {
  fill: true;
  width?: never;
  height?: never;
};

type FixedProps = CommonProps & {
  fill?: false;
  width: number;
  height: number;
};

type PictureProps = FillProps | FixedProps;

const Picture: FC<PictureProps> = ({
  src,
  alt,
  className,
  priority = false,
  onClick,
  quality,
  placeholder,
  blurDataURL,
  sizes,
  ...dim
}) => {
  // shared props for both modes
  const shared: Partial<ImageProps> = {
    src,
    className,
    priority,
    onClick,
    quality,
    placeholder,
    blurDataURL,
    decoding: "async",
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
  };

  if ("fill" in dim && dim.fill) {
    return (
      <Image
        {...(shared as ImageProps)}
        fill
        sizes={sizes ?? "100vw"}
        style={{ objectFit: "cover" }}
        alt={alt}
      />
    );
  }

  const { width, height } = dim as FixedProps;
  return (
    <Image
      {...(shared as ImageProps)}
      width={width}
      height={height}
      sizes={sizes}
      alt={alt}
    />
  );
};

export default memo(Picture);
