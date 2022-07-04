
import constant from "../constant"
import report_data from "../data"
const initState = []

export default function reportReducer(pre = initState, action) {
    const { type, data } = action
    switch (type) {
        case constant.GET_REPORTS:
            return pre
        case constant.EDIT_REPORTS:
            let ret = pre.slice()
            ret.forEach(val => {
                if (val.type === data.currentType) {
                    let target = val.reports.slice(0)
                    target.forEach((report, index) => {
                        data.selectedReports.forEach(sid => {
                            if (report.id === sid) {
                                target[index].status = data.status
                            }
                        })
                    })
                    if (target.lenght !== 0) val.reports = target
                }
            })
            return ret
        default:
            return report_data.list
    }
}