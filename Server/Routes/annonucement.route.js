import express from 'express'
import {  createAnnouncement, deleteAnnouncement, getAnnouncement, getAnnouncements, updateAnnouncement } from '../Controller/aanouncement.controller.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js'



const announcementRoute=express.Router()

announcementRoute.post('/create',AuthMiddleware,createAnnouncement)
announcementRoute.post('/single',AuthMiddleware,getAnnouncement)
announcementRoute.post('/all',AuthMiddleware,getAnnouncements)
announcementRoute.post('/update/:id',AuthMiddleware,updateAnnouncement)
announcementRoute.post('/delete/:id',AuthMiddleware,deleteAnnouncement)


export default announcementRoute