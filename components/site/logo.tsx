export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/logo.png"
        alt="Meetpoint Logo"
        className="h-14 w-auto object-contain"
      />
      <span
        className="font-extrabold text-2xl"
        style={{ fontFamily: "Helvetica" }}
      >
        Meetpoint
      </span>
    </div>
  )
}
