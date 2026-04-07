import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 工资表-获取列表
export function getLaborList(params, query) {
  const url = '/labor/laborList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 工资表-删除
export function deleteLabor(params) {
  return request({
    url: '/labor/delete',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 社保费-获取列表
export function getIssuranceList(params, query) {
  const url = '/issurance/issuranceList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 社保费-删除
export function deleteIssurance(params) {
  return request({
    url: '/issurance/delete',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 社保费-劳务派遣-获取列表
export function getIssuranceDispatchList(params, query) {
  const url = '/issurance/issuranceDispatchList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 社保费-劳务派遣-删除
export function deleteDispatch(params) {
  return request({
    url: '/issurance/deleteDispatch',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 公职金-职工-获取列表
export function getPfList(params, query) {
  const url = '/pf/pfList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 公职金-职工-删除
export function deletePF(params) {
  return request({
    url: '/pf/delete',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 公职金-劳务派遣-获取列表
export function getPfDispatchList(params, query) {
  const url = '/pf/pfDispatchList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 公职金-劳务派遣-删除
export function deletePFDispatch(params) {
  return request({
    url: '/pf/deletePFDispatch',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 企业年金-获取列表
export function getCpList(params, query) {
  const url = '/cp/cpList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 企业年金-删除
export function deleteCp(params) {
  return request({
    url: '/cp/delete',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 工会费明细-获取列表
export function getUnionDuesList(params, query) {
  const url = '/ud/unionDuesList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 工会费明细-删除
export function deleteUD(params) {
  return request({
    url: '/ud/delete',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 打包管理-新增
export function addPackage(params) {
  return request({
    url: '/package/pbAM',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 打包管理-删除
export function deletePackage(params) {
  return request({
    url: '/package/pbDeleteByID',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 打包管理-删除
export function deletepblDeleteBy(params) {
  return request({
    url: '/package/pblDeleteByID',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 打包管理-获取箱号
export function getPBListBoxNoByOrderNo(params) {
  return request({
    url: '/package/getPBListBoxNoByOrderNo',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 工序清单-获取列表
export function getProcessesByPage(params, query) {
  const url = '/processes/getProcessesByPage/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 工序清单-新增
export function addProcesses(params) {
  return request({
    url: '/processes/rocessesAM',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 工序清单-删除
export function deleteProcesses(params) {
  return request({
    url: '/processes/processesDeleteByID',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 订单清单-获取列表
export function getProdOrderByPage(params, query) {
  const url = '/prodOrder/getProdOrderByPage/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 订单清单-新增
export function addProdOrder(params) {
  return request({
    url: '/prodOrder/poAM',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 订单清单-删除
export function deleteProdOrder(params) {
  return request({
    url: '/prodOrder/poDeleteByID',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 订单清单-删除
export function deleteDProdOrder(params) {
  return request({
    url: '/prodOrder/polDeleteByID',
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

