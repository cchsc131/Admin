// eslint-disable-next-line @typescript-eslint/no-unused-vars
import apiUrl from '../../api/Url.js';
import link from "../../api/Link.js"
const home:Object={
  state: {
    flag:true,
    dialogFormVisible: false,
    dialogAdd:false,
    
    userData:"",// 用户原来的信息
    upUserData:'',// 用户修改后的信息
  },
  getters: {

  },
  // mutation可以改state的数据
  mutations: {
      CHANGE(state:any){
        state.flag=!state.flag
      },
      UP_Dialog(state:any,row:any){
        state.dialogFormVisible=!state.dialogFormVisible
        state.userData=row
      },
      // 点击添加用户
      addDialog(state:any){
        state.dialogAdd=!state.dialogAdd
        // window.location.reload()

      },
      // 点击用户修改的确定
      Dialog(state:any){
        state.dialogFormVisible=!state.dialogFormVisible
        // 刷新页面
        window.location.reload()
      },
      // 点击用户添加的确定
      Dialogs(state:any){
        state.dialogAdd=!state.dialogAdd

        // 刷新页面
        window.location.reload()
      },
      upDATA(state:any,data:any){
        state.upUserData=data
      }
  },
  actions: {
    // vuex中请求来的数据不能直接赋值
    UPDATA(context:any){
      link(apiUrl.userList).then((ok: any) => {
      console.log(ok)
      context.commit('upDATA',ok.data)
      })
    },
    // ADDDATA(context:any){
    //   link(apiUrl.userList).then((ok: any) => {
    //   console.log(ok)
    //   context.commit('upDATA',ok.data)
    //   })
    // },
    deleteUser(context:any,data:any){
      link(apiUrl.userList+'/'+data.id,'delete').then((ok:any)=>{
        console.log(ok.data);
        window.location.reload()
      })
    }
  },
}
export default home