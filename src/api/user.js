export const loginByUsername = (username, password) => new Promise((res, rej) => {
    if (username && password) {
        res({
            data: {
                access_token: username,

            }
        })
    } else {
        rej('用户名或密码错误')
    }
})
export const getUserInfo = () => new Promise((res) => {
        res({
            data: {
                name: 'sjh',
                roles: 'admin'
            }
        })
    })
    // export const loginByUsername = (username, password) => request({
    //     url: '/api/blade-auth/oauth/token',
    //     method: 'post',
    //     headers: {
    //       'Tenant-Id': tenantId,
    //       'Captcha-Key': key,
    //       'Captcha-Code': code,
    //     },
    //     params: {
    //       tenantId,
    //       username,
    //       password,
    //       grant_type: (website.captchaMode ? "captcha" : "password"),
    //       scope: "all",
    //       type
    //     }
    //   });