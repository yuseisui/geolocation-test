'use strict'

const success = (pos) => {
  const { coords, timestamp } = pos
  const ido = coords.latitude
  const keido = coords.longitude
  const map = L.map('map').setView([ido, keido], 18)
  console.log(new Date(timestamp))

  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
  }).addTo(map)

  L.marker([ido, keido]).addTo(map)
}

const error = (err) => {
  switch (err.code) {
    case 1:
      console.error('このページにはアクセス許可がないため、位置情報の取得に失敗しました。')
      break
    case 2:
      console.error('少なくともひとつの位置情報ソースが内部的なエラーを返したため、位置情報の取得に失敗しました。')
      break
    case 3:
      console.error('位置情報の取得に時間がかかったため、中断しました。')
      break
    default:
      console.error('不明なエラー')
  }
}

const options = {
  enableHighAccuracy: true
}

navigator.geolocation.getCurrentPosition(success, error, options)
