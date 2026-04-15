# Product API Specification

---

## Overview

This backend is a Spring Boot application that provides REST APIs for managing products. It supports:

* Create product (with image)
* Update product (with optional image)
* Delete product
* Fetch products
* Search products
* Retrieve product images

The backend uses MySQL for persistence and stores images as binary data.

---

## Architecture

Flow:

Controller → Service → Repository → Database

* **Controller**: Handles HTTP requests
* **Service**: Business logic + image handling
* **Repository**: JPA database access
* **Database**: MySQL

---

## Data Model

### Product

```json
{
  "id": 1,
  "name": "string",
  "price": 100.0,
  "brand": "string",
  "stock": 10,
  "description": "string",
  "imageName": "string",
  "imageType": "string"
}
```

### Notes:

* `id` is auto-generated
* `imageData` is NOT returned (backend internal only)
* No strict validation → null values allowed

---

## API Endpoints

---

### 1. GET /api/products

Fetch all products

**Response:**

* 200 OK → Array of Product

---

### 2. GET /api/products/{id}

Fetch single product

**Response:**

* 200 OK → Product
* 404 Not Found

---

### 3. GET /api/products/{id}/image

Fetch product image

**Response:**

* 200 OK → Binary image
* 404 Not Found

---

### 4. GET /api/products/search?keyword=value

Search products

**Query Param:**

* `keyword` (required)

**Response:**

* 200 OK → Array of Product

---

### 5. POST /api/products

Create new product

**Request Type:** multipart/form-data

**Fields:**

* `product` → JSON
* `imageFile` → file (REQUIRED)

**Example:**

```json
{
  "name": "Speaker",
  "price": 79.99,
  "brand": "AudioMax",
  "stock": 15,
  "description": "Portable speaker"
}
```

**Response:**

* 201 Created → Product
* 500 Internal Server Error

---

### 6. PUT /api/products/{id}

Update product

**Request Type:** multipart/form-data

**Fields:**

* `product` → JSON (REQUIRED)
* `imageFile` → file (OPTIONAL)

**Behavior:**

* If `imageFile` missing → keep old image
* If present → replace image

**Response:**

* 200 OK → "Updated"
* 404 Not Found → "Product Not Updated"

---

### 7. DELETE /api/products/{id}

Delete product

**Response:**

* 200 OK → "Product Deleted"
* 404 Not Found

---

## 🔥 Integration Rules (CRITICAL)

### 1. Field Names (STRICT)

```text
product
imageFile
```

* Case-sensitive
* MUST match exactly in frontend FormData

---

### 2. Multipart Format

Frontend MUST send:

```javascript
const formData = new FormData();

formData.append(
  "product",
  new Blob([JSON.stringify(product)], {
    type: "application/json",
  })
);

formData.append("imageFile", file); // if exists
```

---

### 3. Data Types

* `price` → number
* `stock` → integer
* `id` → backend generated

---

### 4. Optional vs Required

| Field     | POST | PUT |
| --------- | ---- | --- |
| product   | ✅    | ✅   |
| imageFile | ✅    | ❌   |

---

## Error Handling Format

Currently backend returns:

* Plain text (for PUT/DELETE)
* Default Spring errors for failures

### Common Errors:

| Status | Meaning                     |
| ------ | --------------------------- |
| 400    | Bad request (missing parts) |
| 404    | Not found                   |
| 500    | Server error                |

---

## Status Code Summary

| Endpoint  | Success | Failure |
| --------- | ------- | ------- |
| GET all   | 200     | —       |
| GET by id | 200     | 404     |
| POST      | 201     | 500     |
| PUT       | 200     | 404     |
| DELETE    | 200     | 404     |
| SEARCH    | 200     | 400     |

---

## Known Constraints

* No validation annotations
* Missing fields → stored as null
* Image stored in DB as byte[]
* Search is case-insensitive for name & brand
* `keyword` is required for search

---

## Example Flow

### Create Product

* Send multipart request
* Receive Product JSON

### Update Product (without image)

* Send only `product`
* Image remains unchanged

### Update Product (with image)

* Send both `product` + `imageFile`
* Image replaced

---

## Final Rule (IMPORTANT)

This document is the **single source of truth**.

Frontend MUST strictly follow:

* Exact field names
* Exact request formats
* Endpoint definitions

Any deviation will break the integration.
