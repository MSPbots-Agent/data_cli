# Owl API document

Base URL

```
https://owlstg.mspbots.ai/owl-agent/api/v1
```

Content-Type

```
application/json
```

---

## 1. Overview

The **OWL Agent API** provides endpoints for interacting with the OWL Agent service.

The API allows clients to:

- Search datasets using natural language
- Generate datasets via chat instructions

The API follows a **RESTful design** and communicates using **JSON payloads**.

---

## 2. API Endpoints

---

### 2.1 Search Dataset (RAG)

Search datasets using natural language requirements.

#### Endpoint

```
POST /search_dataset_via_rag
```

#### Description

Search datasets using semantic search (RAG-based).

This API returns the most relevant datasets according to the user's requirement.

#### Request Body

```json
{
  "mspbots_token": "string",
  "tenant_code": "string",
  "requirements": "string",
  "top_k": 5
}
```

#### Parameters

| Field | Type | Required | Description |
|-----|-----|-----|-----|
| mspbots_token | string | Optional | MSPbots authentication token, if not provided, the default(Leo Yang) token will be used |
| tenant_code | string | yes | Tenant identifier |
| requirements | string | yes | Natural language dataset requirement |
| top_k | integer | no | Number of results to return |

#### Example Request

```json
{
  "mspbots_token": "your token",
  "tenant_code": "demo",
  "requirements": "sales dataset with revenue and customer fields",
  "top_k": 5
}
```

---

### 2.2 Generate Dataset

Create a dataset through a conversational instruction.

#### Endpoint

```
POST /search_dataset_via_rag
```

#### Description

Generate a dataset by describing it using natural language.

#### Request Body

```json
{
  "mspbots_token": "string",
  "tenant_code": "string",
  "chat": "string",
  "thread_id": "string"
}
```

#### Parameters

| Field | Type | Required | Description |
|-----|-----|-----|-----|
| mspbots_token | string | Optional | MSPbots authentication token, if not provided, the default(Leo Yang) token will be used |
| tenant_code | string | yes | Tenant identifier |
| chat | string | yes | Natural language instruction for dataset generation |
| thread_id | string | Optional | Thread identifier for conversation continuity, if not provided, a new thread will be created |

#### Example Request

```json
{
  "mspbots_token": "your token",
  "tenant_code": "demo",
  "chat": "Create a dataset with fields: date, revenue, customer_id",
  "thread_id": "221cdcc9-2943-413d-9da6-c7164ee7243d"
}
```
---

## 3. Error Response

Example error response:

```json
{
  "ok": false,
  "error": "Invalid tenant_code"
}
```

| Field | Description |
|------|------|
| ok | Request success status |
| error | Error message |

---

## 4. HTTP Status Codes

| Code | Meaning |
|----|----|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 500 | Internal Server Error |

---

## 5. Typical Workflow

Typical usage flow:

1. Search dataset

```
search_dataset_rag
```

2. If no dataset is found, generate one

```
generate_dataset
```

---

# MSPbots API document

## 2.3 Query Dataset Data

Query data from a specified Dataset, supporting filtering, pagination, and sorting.

### Endpoint

```
GET https://app.mspbots.ai/web/query/sys/dataset/{datasetId}/data
```

### Description

Retrieve a list of data records from a given dataset. Commonly used for BI reports or dataset pages.

### Request Example

```
GET https://app.mspbots.ai/web/query/sys/dataset/2010931613545922561/data?filter=mspbots_id%20in%20(11%2C12)&size=100&current=1
```

### Query Parameters

| Name         | Type    | Required | Description                                   | Example                  |
|--------------|---------|----------|-----------------------------------------------|--------------------------|
| filter       | string  | No       | Data filter condition (SQL WHERE style)       | mspbots_id in (11,12)    |
| orderBy      | string  | No       | Sort order (asc / desc)                       | asc                      |
| orderFields  | string  | No       | Sort field                                    | create_time              |
| size         | int     | Yes      | Page size                                     | 100                      |
| current      | int     | Yes      | Current page                                  | 1                        |

### Path Parameters

| Name      | Type  | Required | Description      |
|-----------|-------|----------|-----------------|
| datasetId | long  | Yes      | Dataset ID      |

### Header Parameters

| Name           | Required | Description                | Example                        |
|----------------|----------|----------------------------|--------------------------------|
| token          | Yes      | User login token           | 53ae9a8d48833421c8e9e1d97748f8ef |
| tenantcode     | Yes      | Tenant ID                  | 1812750989720203265            |

**Required headers:**

- token
- tenantcode

### Example Request (Python)

```python
import requests
url = 'https://app.mspbots.ai/web/query/sys/dataset/2010931613545922561/data'
params = {
  'filter': 'mspbots_id in (11,12)',
  'size': 100,
  'current': 1
}
headers = {
  'token': 'your token',
  'tenantcode': 'your tenant_code'
}
resp = requests.get(url, params=params, headers=headers)
print(resp.json())
```

### Example Request (cURL)

```bash
curl --location 'https://app.mspbots.ai/web/query/sys/dataset/2010931613545922561/data?filter=mspbots_id%20in%20(11%2C12)&size=100&current=1' \
  --header 'token: your token' \
  --header 'tenantcode: your tenant_code'
```

### Response Example

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [
      {
        "mspbots_id": 11,
        "name": "Test Bot",
        "status": "active"
      },
      {
        "mspbots_id": 12,
        "name": "Support Bot",
        "status": "active"
      }
    ],
    "total": 2,
    "size": 100,
    "current": 1
  }
}
```

### Response Fields

| Field             | Type     | Description         |
|-------------------|----------|---------------------|
| code              | int      | Status code         |
| message           | string   | Message             |
| data.records      | array    | Data records list   |
| data.total        | int      | Total count         |
| data.size         | int      | Page size           |
| data.current      | int      | Current page        |

### Filter Syntax

The `filter` parameter supports SQL-style expressions:

- `mspbots_id = 11`
- `mspbots_id in (11,12)`
- `status = 'active'`
- `create_time >= '2026-01-01'`

### Permission Control

The API checks the following for permission validation:

- token
- tenantcode
- loginasuserid
- dataFilter
