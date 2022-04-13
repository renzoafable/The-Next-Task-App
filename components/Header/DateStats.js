import format from 'date-fns/format'

export default function DateStats() {
  const currentDate = format(new Date(), 'EEE, LLL dd, yyyy')

  return (
    <div>
      <p className="text-white mb-0 fw-bolder">{currentDate}</p>
      <span className="text-info mb-0 fs-6">3 Active Tasks</span>
      <span className="text-white mb-0 fs-6"> / </span>
      <span className="text-danger mb-0 fs-6">3 Incomplete Tasks</span>
    </div>
  )
}