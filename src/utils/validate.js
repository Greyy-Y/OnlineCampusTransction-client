/**
 * 验证邮箱
 */
export function validateEmail(value) {
	let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	return !reg.test(value) ? true : false;
}
/**
 * 验证密码 6至20位的字母+数字
 */
export function validatePass(value) {
	let reg = /^[a-zA-Z0-9]{6,20}$/;
	return !reg.test(value) ? true : false;
}
