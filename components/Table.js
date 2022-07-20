import { Heading,Button } from '@chakra-ui/react'
export default function Table(props){
    const table=props.table
    return (
        <div>
        <Heading>Table</Heading>
        {table.map((item)=>{
            return <p key={item.id}><span >{item.player_name} played {item.as}</span></p>
        })}
        {(table.length>0) && <Button colorScheme={"teal"} onClick={() => props.lie(table[table.length-1])}>Yekdheb</Button>}
        
    </div>
    )
}