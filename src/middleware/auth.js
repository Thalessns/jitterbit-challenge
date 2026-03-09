const dotenv = require("dotenv")

dotenv.config()

const JWT_SERVICE_ENDPOINT = process.env.JWT_SERVICE_ENDPOINT
const ENABLE_AUTH = process.env.ENABLE_AUTH === "true"

const authMiddleware = async (req, res, next) => {
  if (!ENABLE_AUTH) {
    return next()
  }

  if (!JWT_SERVICE_ENDPOINT) {
    console.error("JWT_SERVICE_ENDPOINT is not configured")
    return res.status(500).json({
      status: "auth-error",
      message: "Authentication service is not configured",
    })
  }

  const accessGroup = req.headers.access_group
  const signature = req.headers.signature

  if (!accessGroup || !signature) {
    return res.status(401).json({
      status: "auth-error",
      message:
        "Missing required authentication headers: access_group and signature",
    })
  }

  try {
    const authBody = {
      access_group: accessGroup,
      signature: signature,
    }

    const response = await fetch(JWT_SERVICE_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return res.status(response.status).json({
        status: "auth-error",
        message: errorData.detail || "Authentication failed",
      })
    }

    next()
  } catch (error) {
    console.error("Authentication service error:", error.message)
    return res.status(503).json({
      status: "auth-error",
      message: "Authentication service is unavailable",
    })
  }
}

module.exports = { authMiddleware }
