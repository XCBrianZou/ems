
import constant from "../constant"
const initState = []

export default function roleReducer(pre = initState, action) {
    const { type, data } = action

    switch (type) {
        case constant.UPDATE_ROLE:
            return data
        default:
            return pre
    }
}