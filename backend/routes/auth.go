package routes

import (
	"jabarjer-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(router *gin.RouterGroup) {
	router.POST("/login", controllers.Login)
	router.POST("/register", controllers.Register)
}

func Login(c *gin.Context) {
	controllers.Login(c)
}
