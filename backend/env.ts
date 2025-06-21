/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	
	// Database
	DATA_DIR: Env.schema.string.optional(),
	
	// AI Services
	AI_SERVICE_PROVIDER: Env.schema.string.optional(),
	OPENAI_API_KEY: Env.schema.string.optional(),
	OPENAI_BASE_URI: Env.schema.string.optional(),
	GEMINI_API_KEY: Env.schema.string.optional(),
	GEMINI_BASE_URI: Env.schema.string.optional(),
	CLAUDE_API_KEY: Env.schema.string.optional(),
	CLAUDE_BASE_URI: Env.schema.string.optional(),
	LOCAL_LLM_BASE_URI: Env.schema.string.optional(),
	LOCAL_LLM_MODEL: Env.schema.string.optional(),
})
