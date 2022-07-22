import { Heading } from '@chakra-ui/react'
export default function Taksir(props){
    const taksir=props.taksir
    return (
            <div style={{textAlign:'center',color:'white'}}>
                 <Heading>Taksir :</Heading>
                 {taksir.map((j) => { return (<div style={{padding:'2px'}}><div style={{border:'1px solid black',borderRadius:'20px',padding:'2px'}}>{j}</div></div>) })}
            </div>
   
    )
}