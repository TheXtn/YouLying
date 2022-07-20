import { Heading } from '@chakra-ui/react'
export default function Table(props){
    const table=props.table
    return (
        <div>
        <Heading>Table</Heading>
        {table.map((item)=>{
            return <p key={item.id}><span onClick={() => props.lie(item)}>{item.player_name} played {item.as}</span></p>
        })}
    </div>
    )
}