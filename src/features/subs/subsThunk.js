import { customFetch2 } from 'src/utils/axios'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
export const createSubThunk = async (sub, thunkAPI) => {
  try {
    const resp = await customFetch2.post('/stores/admin/v1/subscription', sub)
    console.log(resp.data)
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Create subscription successfully')))
    return resp.data.subscriptionId
  } catch (error) {
    thunkAPI.dispatch(
      addToast(BasicToast('#e55353', `Create subscription failed`, error.response.status)),
    )
  }
}

export const listingSubsThunk = async ({ limit, offset }) => {
  try {
    const res = await customFetch2.get(
      `/stores/admin/v1/subscription?limit=${limit}&offset=${offset}`,
    )
    const subs = res.data.data
    return subs
  } catch (error) {
    console.log(error)
  }
}
