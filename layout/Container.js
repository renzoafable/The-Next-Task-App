import Container from 'react-bootstrap/Container'

import Header from 'components/Header'
import TaskInput from 'components/TaskInput'

export default function AppContainer({ children }) {
  return (
    <Container fluid="md" className='shadow-lg h-75 w-50 rounded-2 p-4 overflow-auto'>
      <Header />
      <TaskInput />
      {children}
    </Container>
  )
}