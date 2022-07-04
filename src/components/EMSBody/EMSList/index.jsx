import React, { useEffect, useState } from 'react'
import constant from '../../../constant'
import './index.css'
import { Checkbox } from 'antd'
import { useSelector } from 'react-redux'

export default function EMSList(props) {

  const currentType = props.currentType;
  const [reportsData, setReports] = useState([])
  const [selectedList, setSelected] = useState([])

  let report_data = []
  useSelector(state => report_data = state.reports)

  useEffect(() => {
    report_data.forEach(item => {
      if (item.type === currentType) setReports(item.reports)
    })
    setSelected([])
  }, [currentType])
  useEffect(() => {
    props.onChangeStatus(selectedList)
  }, [selectedList])

  const statusTrans = (status) => {
    switch (status) {
      case 0: return constant.PENDING
      case 1: return constant.APPROVED
      case -1: return constant.REJECTED
    }
  }

  const dateFormat = (dateNum) => {
    let target = new Date(dateNum)
    return `${target.getDate()}-${constant.MONTHS[target.getMonth()]}-${target.getFullYear()}`
  }

  let userRole = 'HR';
  useSelector(state => userRole = state.role)

  const updateSelected = (isSelected, id) => {
    if (isSelected) {
      if (!selectedList.includes(id)) setSelected([...selectedList, id])
    } else {
      let index = selectedList.indexOf(id)
      if (index >= 0) setSelected(selectedList.slice(0, index).concat(selectedList.slice(index + 1, selectedList.length)))
    }
  }

  return (
    <ul className='list-body'>
      <li className='list-header'>
        <div className='choose'></div>
        <div className='id'>Employee ID</div>
        <div className='option'>Employee Name</div>
        <div className='option'>Leave Type</div>
        <div className='option'>Start Date</div>
        <div className='option'>End Date</div>
        <div className='option' style={{ marginRight: 0 }}>Status</div>
      </li>
      {
        reportsData.length !== 0 ?
          reportsData.map((item, index) => {
            return (
              <li className={index % 2 === 0 ? 'list-item-odd' : 'list-item-even'} key={item.id}>
                <div className='choose'>
                  {
                    userRole == 'HR Manager' ?
                      <Checkbox onChange={(e) => {
                        updateSelected(e.target.checked, item.id)
                      }} />
                      :
                      null
                  }

                </div>
                <div className='id'>{item.id}</div>
                <div className='option'>{item.name}</div>
                <div className='option'>{item.type}</div>
                <div className='option'>{dateFormat(item.start)}</div>
                <div className='option'>{dateFormat(item.end)}</div>
                <div className='option' style={{ marginRight: 0 }}>{statusTrans(item.status)}</div>
              </li>
            )
          })
          :
          null
      }
    </ul>
  )
}
