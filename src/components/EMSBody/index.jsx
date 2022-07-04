import React, { useEffect, useState } from 'react'
import EMSList from './EMSList'
import './index.css'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import report_data from '../../data';
import constant from '../../constant';
import { updateReports } from '../../actions/Reports';
import TextArea from 'antd/lib/input/TextArea';

export default function EMSBody() {

  const types = report_data.types;
  const [currentType, setType] = useState(types[0])
  const [popupSize, setSize] = useState({ width: 0, height: 0, top: 0 })
  const [ratio, setRatio] = useState(2)
  const [onApproval, changeApproval] = useState(false)
  const menuItems = [
    {
      label: types[0],
      key: '1',
    },
    {
      label: types[1],
      key: '2',
    },
    {
      label: types[2],
      key: '3',
    },
  ]

  const handleMenuClick = (e) => {
    menuItems.forEach(item => {
      if (item.key == e.key) setType(item.label)
    })
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={menuItems}
    />
  );

  const onUnload = () => {
    setRatio(2)
  }

  let userRole = 'HR';
  useSelector(state => userRole = state.role)
  const [selectedReports, setSelectedReport] = useState([])
  const dispatch = useDispatch()
  let mainDiv = null;
  useEffect(() => {
    window.addEventListener("beforeunload", onUnload)
    setSize({
      width: mainDiv.offsetWidth,
      height: mainDiv.offsetHeight * ratio,
      top: mainDiv.offsetTop
    })
    return () => {
      window.removeEventListener("beforeunload", onUnload)
    }
  }, [])

  return (
    <div className='body' ref={dom => mainDiv = dom}>
      <div className='selector'>
        <h1>{constant.SELECTOR_TITLE}</h1>
        <Dropdown className='dropdown' overlay={menu}>
          <Button>
            <Space>
              {currentType}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <EMSList currentType={currentType} onChangeStatus={(selectedReports) => {
        if (selectedReports) setSelectedReport(selectedReports)
      }} />
      {
        userRole === 'HR Manager' ?
          <div className='btn-container'>
            <button onClick={() => {
              dispatch(updateReports({ currentType, selectedReports, status: -1 }))
            }}>{constant.REJECT}</button>
            <button onClick={() => {
              changeApproval(true)
            }}>{constant.APPROVE}</button>
          </div>
          :
          null
      }

      {
        onApproval ?
          <div className='approve' style={{
            width: popupSize.width,
            height: popupSize.height,
            top: popupSize.top,
          }}>

            <div className='inp-container'>
              <div>{constant.INPUT_TITLE}</div>
              <TextArea rows={5}/>
              <button className='btn-approval' onClick={() => {
                dispatch(updateReports({ currentType, selectedReports, status: 1 }))
                changeApproval(false)
              }}>{constant.APPROVE}</button>
            </div>
          </div>
          :
          null
      }


    </div>
  )
}
