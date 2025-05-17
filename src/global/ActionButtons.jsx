import { faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Row, Tooltip } from "antd"

function ActionButtons(props) {
  const { record, handleViewModal } = props
  return (
    <Row justify={"space-evenly"}>
      {handleViewModal ? (
        <Col>
          <Tooltip title="Xem" placement="bottom">
            <Button
              className="action-buttons"
              type="default"
              size={"small"}
              style={{
                background: "transparent",
                borderColor: "transparent",
                color: "#448026"
              }}
              icon={<FontAwesomeIcon icon={faEye} />}
              onClick={handleViewModal}
            >
              Show
            </Button>
          </Tooltip>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  )
}

export default ActionButtons
