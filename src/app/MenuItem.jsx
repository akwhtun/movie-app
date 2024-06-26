import Link from "next/link";

export default function MenuItem({title, address}) {
  return (
    <Link href={address}>
    {title}
    </Link>
  )
}
