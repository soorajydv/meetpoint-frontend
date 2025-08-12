export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="Meetpoint Logo"
        className="h-10 w-6 object-contain"
      />
      <span className="font-semibold">Meetpoint</span>
    </div>
  )
}

