import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, QrCode, RefreshCcw, Lock, AlertCircle, CheckCircle, X } from 'lucide-react'
import { useBooking } from '../context/BookingContext'


export default function PayPage() {
  const { id } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()
  const method = useMemo(() => new URLSearchParams(search).get('method') || 'mpesa', [search])
  const { getBooking, markBookingPaid } = useBooking()
  const booking = getBooking(Number(id))

  const [showConfirm, setShowConfirm] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [paidAt, setPaidAt] = useState(null)
  const [qrHidden, setQrHidden] = useState(true)
  const [qrSeed] = useState(() => `${id}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`)

  useEffect(() => {
    if (!booking) return
    // if booking already has a paid flag, reflect it (this assumes booking has paidAt)
    if (booking.paidAt) {
      setSuccess(true)
      setPaidAt(new Date(booking.paidAt))
    }
  }, [booking])

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2] p-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-sm w-full">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-[#355E3B] mb-2">Booking Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">We couldn't locate reference #BK{id}</p>
          <Link to="/booking" className="block w-full py-3 bg-[#E76F51] text-white rounded-xl font-bold">Return to Booking</Link>
        </div>
      </div>
    )
  }

  const amount = booking.totalPrice || 0
  const bookingRef = `TPM-${booking.id}`

  function startPayment() {
    setShowConfirm(true)
  }

  function confirmPayment() {
    setShowConfirm(false)
    setProcessing(true)
    // simulate payment latency
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      const now = new Date()
      setPaidAt(now)
      // optionally mark booking as paid in context (if provided)
      if (typeof markBookingPaid === 'function') {
        markBookingPaid(booking.id, { paidAt: now.toISOString(), amount })
      }
    }, 1400)
  }

  function cancelPayment() {
    setShowConfirm(false)
  }

  // --- QR generation (simple, deterministic SVG grid) ---
  // Using seed to create a 21x21 grid similar to a QR aesthetic (NOT a real QR)
  function makeGrid(seed, size = 21) {
    const s = seed.split('').reduce((a,c)=>a+c.charCodeAt(0), 0)
    const rand = (n) => Math.abs(Math.floor(Math.sin(n + s) * 10000))
    const cells = []
    for (let y = 0; y < size; y++) {
      const row = []
      for (let x = 0; x < size; x++) {
        const v = (rand(x*size + y) % 2) === 0
        row.push(v)
      }
      cells.push(row)
    }
    return cells
  }

  const grid = useMemo(() => makeGrid(qrSeed, 21), [qrSeed])

  function renderSVGGrid(grid, cell=8, padding=8) {
    const size = grid.length * cell + padding*2
    const rects = []
    grid.forEach((row,y)=>{
      row.forEach((on,x)=>{
        if (on) {
          rects.push(`<rect x="${padding + x*cell}" y="${padding + y*cell}" width="${cell}" height="${cell}" fill="#0F172A" />`)
        }
      })
    })
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
      <rect width='100%' height='100%' fill='#fff'/>
      ${rects.join('\n')}
      <rect x='${padding}' y='${padding}' width='${cell*3}' height='${cell*3}' fill='none' stroke='#0F172A' stroke-width='2'/>
      <rect x='${size - padding - cell*3}' y='${padding}' width='${cell*3}' height='${cell*3}' fill='none' stroke='#0F172A' stroke-width='2'/>
    </svg>`
    return svg
  }

  const svgString = useMemo(() => renderSVGGrid(grid, 8, 8), [grid])

  function downloadSVG() {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${bookingRef}-secure-code.svg`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  async function downloadPNG() {
    // convert svg to png via canvas
    const img = new Image()
    const svg = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString)
    return new Promise((res, rej) => {
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(img,0,0)
        canvas.toBlob((blob)=>{
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${bookingRef}-secure-code.png`
          document.body.appendChild(a)
          a.click()
          a.remove()
          URL.revokeObjectURL(url)
          res(true)
        })
      }
      img.onerror = rej
      img.src = svg
    })
  }

  function copyCode() {
    const code = qrSeed
    navigator.clipboard.writeText(code).then(()=>{
      alert('Secure code copied to clipboard — keep it private')
    })
  }

  return (
    <div className="bg-[#F8F5F2] min-h-screen font-sans py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-[#355E3B]">Secure Escrow Payment</h1>
              <p className="text-xs text-gray-500">Booking: <span className="font-bold">{bookingRef}</span> • {booking.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-gray-400">Amount</p>
              <p className="text-xl font-black text-[#355E3B]">KES {amount?.toLocaleString()}</p>
            </div>
          </div>

          {/* Payment CTA */}
          {!success && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Pay using <span className="font-bold uppercase">{method}</span>. This will initiale a payment prompt.</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={startPayment} className="px-6 py-3 bg-[#E76F51] text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-all">Confirm & Pay</button>
                  <Link to={`/itinerary/${booking.id}`} className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold">Back to Itinerary</Link>
                </div>
              </div>
              <div className="hidden md:block p-4 bg-[#F8F5F2] rounded-2xl border border-gray-100 text-center">
                <ShieldCheck size={28} className="mx-auto text-[#355E3B] mb-2" />
                <p className="text-[11px] text-gray-500">Funds are held by platform until trip start.</p>
              </div>
            </div>
          )}

          {/* Processing */}
          {processing && (
            <div className="mt-6 flex items-center gap-4">
              <div className="animate-spin p-3 bg-[#355E3B] rounded-full text-white"><RefreshCcw /></div>
              <div>
                <p className="font-bold text-[#355E3B]">Processing payment…</p>
              </div>
            </div>
          )}

          {/* Success / Account Status */}
          {success && (
            <div className="mt-6 p-4 rounded-2xl border border-green-100 bg-green-50">
              <div className="flex items-start gap-4">
                <div className="text-green-700"><CheckCircle size={36} /></div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-800">Payment Successful</h3>
                  <p className="text-xs text-gray-600">We've recorded your payment. Keep your secure start-code private — it's required at pickup.</p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="p-3 bg-white rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-400">Amount Paid</p>
                      <p className="font-black text-[#355E3B]">KES {amount?.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-400">Status</p>
                      <p className="font-black text-[#355E3B]">Funds Held</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-400">Paid On</p>
                      <p className="font-black text-[#355E3B]">{paidAt ? paidAt.toLocaleString() : '—'}</p>
                    </div>
                  </div>

                  {/* QR area */}
                  <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-center shadow-sm relative">
                      <div style={{ width: 200, height: 200 }}>
                        <div dangerouslySetInnerHTML={{ __html: svgString }} />
                        {qrHidden && (
                          <div className="absolute inset-0 bg-white/90 flex items-center justify-center text-xs text-gray-600 p-4 rounded-xl">
                            <div className="text-center">
                              <p className="font-bold mb-2">QR Hidden</p>
                              <p className="text-[11px] text-gray-400">Tap show to reveal your secure start code</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <button onClick={()=>setQrHidden(h=>!h)} className="px-4 py-2 bg-[#355E3B] text-white rounded-2xl font-bold">{qrHidden ? 'Show QR' : 'Hide QR'}</button>
                        <button onClick={copyCode} className="px-4 py-2 bg-white border border-gray-200 rounded-2xl font-medium">Copy Code</button>
                        <button onClick={downloadSVG} className="px-4 py-2 bg-white border border-gray-200 rounded-2xl font-medium">Download SVG</button>
                        <button onClick={downloadPNG} className="px-4 py-2 bg-white border border-gray-200 rounded-2xl font-medium">Download PNG</button>
                      </div>
                      <p className="text-[11px] text-gray-500">Warning: This code authorizes release of funds when scanned by the operator at pickup. Keep it private. Do not share on public channels.</p>

                      <div className="text-sm text-gray-600">
                        <p><span className="font-bold">Secure code:</span> <span className="font-mono text-xs">{qrSeed}</span></p>
                        <p className="mt-2">You may show this QR only to the assigned driver at pickup. If lost, contact Support immediately.</p>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link to={`/itinerary/${booking.id}`} className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold">Back to Itinerary</Link>
                    <button onClick={()=>navigate('/help')} className="px-6 py-3 bg-[#355E3B] text-white rounded-2xl font-black">Contact Support</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Confirm modal (simple) */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#355E3B] text-lg">Confirm Payment</h3>
                <p className="text-xs text-gray-500">You are about to pay <span className="font-black">KES {amount?.toLocaleString()}</span> via <span className="font-bold uppercase">{method}</span>.</p>
              </div>
              <button onClick={cancelPayment} className="p-2 text-gray-400"><X /></button>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={confirmPayment} className="flex-1 px-4 py-3 bg-[#E76F51] text-white rounded-2xl font-black">Confirm & Simulate</button>
              <button onClick={cancelPayment} className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-2xl font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
