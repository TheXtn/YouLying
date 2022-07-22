import { Heading, VStack, Text } from '@chakra-ui/react'
export default function Board(props) {
    const players = props.players
    return (
        <div style={{textAlign:'center',color:'white'}}>
            <Heading>Connected players</Heading>
            <VStack spacing={10} alignItems={"center"}>
                <br/>
                <br/>
                {players.map((item) => {

                    return (
                        <div key={item.name} style={{marginTop:'10px',marginBottom:'10px'}}>
                            <b><Text key={item.name}>{item.name} has {item.cards.length} card(s)</Text></b>
                        </div>
                    )

                })}
            </VStack>


        </div>

    )
}