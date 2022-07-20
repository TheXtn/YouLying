import { Heading, VStack, Text } from '@chakra-ui/react'
export default function Board(props) {
    const players = props.players
    return (
        <div>
            <Heading>Connected players</Heading>
            <VStack spacing={10} alignItems={"center"}>
                {players.map((item) => {

                    return (
                        <Text key={item.name}>{item.name} has {item.cards.length} card(s)</Text>

                    )

                })}
            </VStack>


        </div>

    )
}