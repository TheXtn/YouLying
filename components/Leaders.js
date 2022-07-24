import { Heading, VStack, Text } from '@chakra-ui/react'
export default function Leadears(props){
    const leaders = props.leaderBoard
    return(
        <>
        <VStack spacing={10} alignItems={"center"}>
                {leaders.map((item,index) => {

                    return (
                        <Text key={item.name}>#{index + 1}  {item.name}</Text>

                    )

                })}
            </VStack>

        </>
    )
}