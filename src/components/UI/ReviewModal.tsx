'use client'

import { useState } from "react"
import { toast } from "react-hot-toast"

type ReviewModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: { rating: number; comment: string }) => void
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  if (!isOpen) return null

  const handleConfirm = () => {
    if (!rating) {
      alert("Devi inserire un voto prima di inviare!")
      return
    }
    onSubmit({ rating, comment })
    setRating(0)
    setComment("")
    onClose()
    toast.success('Recensione aggiunta con successo!')
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Lascia una Recensione</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl transition ${
                star <= rating ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Scrivi un commento..."
          className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600 mb-4 resize-none"
          rows={4}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            Annulla
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Invia
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
