import Image from 'next/image'

function ImageBlock({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className="mt-6 sm:mt-8"
    />
  )
}
export default ImageBlock
