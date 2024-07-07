import { Modal } from '@/components/GenericModal/GenericModal'
import React from 'react'
import { Container } from './SuccessInfo.styles'

const SuccessInfo = () => {
  return (
    <Modal modalName="successInfo">
    <Container style={{width:'500px', height:'500px'}}>SuccessInfo</Container>
    </Modal>
  )
}

export default SuccessInfo