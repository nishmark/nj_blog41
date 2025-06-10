# Database Setup Guide for Prisma

## 🗄️ Setting up your database for Prisma

Your application is configured to use Prisma with a MySQL database, but the `DATABASE_URL` environment variable is not configured, which is causing the 500 errors.

## 📋 Steps to set up your database:

### Option 1: Use PlanetScale (Recommended - Free MySQL hosting)

1. **Sign up for PlanetScale** (https://planetscale.com)
2. **Create a new database**
3. **Get your connection string** from the dashboard
4. **Set environment variable in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `DATABASE_URL` with your PlanetScale connection string
   - Format: `mysql://username:password@aws.connect.psdb.cloud/blog_db?sslaccept=strict`

### Option 2: Use Railway (Alternative - Free PostgreSQL hosting)

1. **Sign up for Railway** (https://railway.app)
2. **Create a new PostgreSQL database**
3. **Get your connection string**
4. **Update Prisma schema** to use PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. **Set environment variable in Vercel**

### Option 3: Use Supabase (Another alternative)

1. **Sign up for Supabase** (https://supabase.com)
2. **Create a new project**
3. **Get your connection string**
4. **Set environment variable in Vercel**

## 🔧 Local Development Setup

1. **Create a `.env` file** in your project root:
   ```
   DATABASE_URL="your_database_connection_string_here"
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Run database migrations:**
   ```bash
   npx prisma db push
   ```

## 🚀 Deploy to Vercel

After setting up your database:

1. **Add the `DATABASE_URL` environment variable** in your Vercel project settings
2. **Redeploy your application** - Vercel will automatically run `prisma generate` during build
3. **Your application should now work without 500 errors!**

## 📝 Current Prisma Schema

Your current schema is configured for MySQL:
```prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

model blog {
  id String @id @default(uuid())
  title String
  body String
  author String
  date DateTime
  image String
  username String
  createdAt DateTime @default(now())
  
  @@index([title])
  @@index([author])
  @@index([createdAt])
  @@index([date])
}
```

## 🆘 Need Help?

If you need assistance setting up any of these database providers, let me know which one you'd prefer to use! 