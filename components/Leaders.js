import { Heading, VStack, Text } from '@chakra-ui/react'
export default function Leadears(props){
    const leaders = props.leaderBoard
    return(
        <>
        <VStack spacing={10} alignItems={"center"}>
                {leaders.map((item,index) => {

                    return (
                        <Text key={item.name}>{item.name} is number {index + 1}</Text>

                    )

                })}
            </VStack>

        </>
    )
}