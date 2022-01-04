import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import axios from 'axios'

const app = new Koa()
app.use(bodyParser())


const router = new Router()

router.get('/pivots', async ctx  => {
    const requestInfo = ctx.request.body
    try {
        const response = await axios.get(`https://fcsapi.com/api-v3/forex/pivot_points`, {
            params: {
                symbol: requestInfo.symbol,
                period: requestInfo.period,
                access_key: process.env.FCSAPI_KEY
            }
        })
        const { pivot_point } = response.data.response
        ctx.body = pivot_point
    } catch {
        console.error(`Failed to get pivots: ${res.status}`)
        ctx.body = { error: true }
        ctx.status = 500
    }
})

app.use(router.routes())
app.use(ctx => {
    ctx.body = 'hello world'
})

app.listen(process.env.PORT || 3030)