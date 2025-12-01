#!/bin/bash

# Script untuk membuat database MySQL untuk Jabarjer Studio

echo "Creating database jabarjer_studio..."

# Membuat database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS jabarjer_studio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if [ $? -eq 0 ]; then
    echo "Database created successfully!"
    echo "You can now run the application with: go run main.go"
else
    echo "Failed to create database. Please check your MySQL credentials."
    exit 1
fi
