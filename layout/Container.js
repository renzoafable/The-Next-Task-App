import Header from '../components/Header'

export default function Container({ children }) {
  return (
    <div className="container-md shadow-lg h-75 w-50 rounded-2 p-4">
      <Header />
      {children}
    </div>
  )
}