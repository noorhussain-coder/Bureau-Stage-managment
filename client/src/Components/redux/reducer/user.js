import {createAction,createReducer} from "@reduxjs/toolkit"


export const userReacer=createReducer({},(builder)=>{
    builder.addCase(createAction("loginRequest"),(state)=>{
        state.loaing=false
    })
    builder.addCase(createAction("loginSuccess"),(state,action)=>{
        state.loaing=false,
        state.isAuthenticated=true,
        state.user=action.payload.user,
        state.message=action.payload.message
    })
    builder.addCase(createAction("loginFail"),(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false
        state.error=action.payload
    })
    builder.addCase(createAction("loadUserRequest"),(state)=>{
        state.loading=true
       
    })
    builder.addCase(createAction("succesLoadRequest"),(state,action)=>{
        state.loading=false,
        state.isAuthenticated=true
        state.user=action.payload.user
        state.message=action.payload.message
    })
    builder.addCase(createAction("FailLoadRequest"),(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false
        state.error=action.payload
    })
    builder.addCase(createAction("logoutRequest",(state)=>{state.loading=true}))
    builder.addCase(createAction("logoutSccess",(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.user=null
        state.message=action.payload.user
    }))
    builder.addCase(createAction("logoutFail",(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.error=action.payload
    }))
    builder.addCase(createAction("registerRequest",(state)=>{state.loading=true}))
    builder.addCase(createAction("registerSuccess",(state,action)=>{
        state.loading=false,
        state.isAuthenticated=true,
        state.user=action.payload.user
        state.message=action.payload.message
    }))
    builder.addCase(createAction("registerFail",(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.error=action.payload
    }))

    builder.addCase(createAction("clearError",(state)=>{
        state.error=null
    }))
    builder.addCase(createAction("clearMessage",(state)=>{
        state.message=null
    }))

})

