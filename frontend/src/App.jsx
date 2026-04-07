function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎨 Frontend Pronto!</h1>
        <p className="text-lg text-gray-600 mb-6">React + Vite + Tailwind CSS</p>
        <div className="space-y-2 text-left bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">✅ Pacotes Instalados:</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ React 19+</li>
            <li>✓ Vite</li>
            <li>✓ Tailwind CSS</li>
            <li>✓ Axios</li>
            <li>✓ React Hook Form + Zod</li>
            <li>✓ Lucide React</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
