import { useRouter } from 'vue-router'
import { reactive, toRefs, watchEffect } from 'vue'
import { get, post, patch, del } from '@/utils/request'

export const useAddressEffect = (toastShow) => {
  const router = useRouter()

  const URL = '/api/user/address'
  const data = reactive({
    city: '',
    department: '',
    houseNumber: '',
    name: '',
    phone: '',
    addressList: [],
    addressOne: {},
    loading: true
  })

  // 新建地址信息逻辑
  const postAddressList = async () => {
    if (data.city === '' || data.department === '' || data.houseNumber === '' || data.name === '' || data.phone === '') {
      return toastShow('信息不能为空')
    }
    try {
      const result = await post(URL, {
        city: data.city,
        department: data.department,
        houseNumber: data.houseNumber,
        name: data.name,
        phone: data.phone
      })
      if (result?.errno !== 0) return toastShow('新建失败')
      toastShow('新建成功')
      setTimeout(() => { router.go(-1) }, 1000)
      data.loading = false
    } catch (e) {
      toastShow('错误！')
    }
  }
  // 更新地址信息逻辑
  const patchAddressList = async (addressId) => {
    const URLID = URL + '/' + addressId
    if (data.city === '' || data.department === '' || data.houseNumber === '' || data.name === '' || data.phone === '') {
      return toastShow('信息不能为空')
    }
    try {
      const result = await patch(URLID, {
        _id: addressId,
        city: data.city,
        department: data.department,
        houseNumber: data.houseNumber,
        name: data.name,
        phone: data.phone
      })
      if (result?.errno !== 0) return toastShow('保存失败')
      toastShow('保存成功')
      setTimeout(() => { router.go(-1) }, 1000)
      data.loading = false
    } catch (e) {
      toastShow('错误！')
    }
  }

  // 获取地址列表
  const getAddressList = async () => {
    const result = await get(URL)
    data.addressList = result.data
    data.loading = false
  }

  // 获取单个地址
  const getAddressOne = async (addressId) => {
    const URLID = URL + '/' + addressId
    const result = await get(URLID)
    if (result?.errno === 0) {
      data.city = result.data.city
      data.department = result.data.department
      data.houseNumber = result.data.houseNumber
      data.name = result.data.name
      data.phone = result.data.phone
      data.addressOne = result.data
    }
  }

  // 删除地址
  const delAddress = async (addressId) => {
    const URLID = URL + '/' + addressId
    try {
      const result = await del(URLID)
      if (result?.errno !== 0) return toastShow('删除失败')
      toastShow('删除成功')
      setTimeout(() => { router.go(-1) }, 1000)
      data.loading = false
    } catch (error) {
      toastShow('错误！')
    }
  }
  watchEffect(() => { getAddressList() })
  const {
    city, department, houseNumber, name,
    phone, addressList, addressOne, loading
  } = toRefs(data)

  return { city, department, houseNumber, name, phone, addressList, addressOne, loading, postAddressList, patchAddressList, getAddressOne, delAddress }
}
