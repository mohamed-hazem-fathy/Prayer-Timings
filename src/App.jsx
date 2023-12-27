
// eslint-disable-next-line no-unused-vars
import style from './App.css';
import Maincontent from './Commponant/MainContent';
import Container from '@mui/material/Container';



function App() {
  
  return (
    <>
      <div style={{display:"flex",justifyContent:"center",width:"100vw",}}>         
        <Container maxWidth="xl">
          <Maincontent />
          
        </Container>
      </div>
    </>
  )
}

export default App
