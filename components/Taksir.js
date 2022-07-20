import { Heading } from '@chakra-ui/react'
export default function Taksir(props){
    const taksir=props.taksir
    return (
            <div>
                 <Heading>Taksir :</Heading>
                 {taksir.map((j) => { return (<li key={j}>{j}</li>) })}
            </div>
   
    )
}