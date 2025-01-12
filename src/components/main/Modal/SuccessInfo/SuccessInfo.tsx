import { GenericModal } from '@/components/GenericModal/GenericModal'
import React from 'react'
import { Box, Container, ReadBtn, Text } from './SuccessInfo.styles'



const SuccessInfo = () => {

  return (
    <GenericModal modalName="successInfo" align='right'>
    <Container>
      <Box>      
        <Text>Книга успішно додана до кошика</Text>
        <ReadBtn>Читати</ReadBtn>
      </Box>
    </Container>
    </GenericModal>
  )
}

export default SuccessInfo