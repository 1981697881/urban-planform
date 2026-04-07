import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 工会费报表
export function getUnionFeeRepot(params, query) {
  const url = '/labor/unionFeeRepot/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('urcrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}// 个税报表
export function getPersonTaxRepot(params, query) {
  const url = '/labor/personTaxRepot/' + params.pageNum + '/' + params.pageSize
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
// 项目用工报表（分页）
export function getProjectLaborRepot(params, query) {
  const url = '/labor/projectLaborRepot/' + params.pageNum + '/' + params.pageSize
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
// 劳务派遣报表（分页）
export function getDispatchLaborRepot(params, query) {
  const url = '/labor/dispatchLaborRepot/' + params.pageNum + '/' + params.pageSize
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

// 外包服务明细报表（分页）
export function getOutsourceLaborDetailRepot(params, query) {
  const url = '/labor/outsourceLaborDetailRepot/' + params.pageNum + '/' + params.pageSize
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

// 人员情况汇总报表（分页）
export function getEmpDetailRepot(params, query) {
  const url = '/labor/empDetailRepot/' + params.pageNum + '/' + params.pageSize
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
// 报表管理-外包奖金汇总表
export function tprojectOutsourcingBonus(params, query) {
  const url = '/summary/tprojectOutsourcingBonus/' + params.pageNum + '/' + params.pageSize
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

// 报表管理-订单完成情况报表
export function poReport(params, query) {
  const url = '/prodOrder/poReportByPage/' + params.pageNum + '/' + params.pageSize
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
// 报表管理-工序流转进度查看
export function processSRReport(params, query) {
  const url = '/prodProcess/processSRReportByPage/' + params.pageNum + '/' + params.pageSize
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
