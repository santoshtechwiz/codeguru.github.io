In this post I will show you how to convert column to row in SQL.For this post I am going to use following table which have three colum `stu_name,sibject and marks`
[![image](https://lh3.googleusercontent.com/-Gjnu-xEX8cI/VU4DU5FquNI/AAAAAAAADJE/7fx3FYgPoDs/image_thumb%25255B1%25255D.png?imgmax=800 "image")](https://www.blogger.com/blog/post/edit/6673695286148904603/9177339531041529534#)  
```sql
SELECT  stu_name,
        MAX(CASE WHEN subject = 'ECO' THEN marks
                 ELSE 0
            END) ECO,
        MAX(CASE WHEN subject = 'HIS' THEN marks
                 ELSE 0
            END) HIS,
        MAX(CASE WHEN subject = 'MAT' THEN marks
                 ELSE 0
            END) MAT,
        MAX(CASE WHEN subject = 'GEO' THEN marks
                 ELSE 0
            END) GEO,
        MAX(CASE WHEN subject = 'SCI' THEN marks
                 ELSE 0
            END) SCI
FROM    col_to_rows
GROUP BY stu_name
```
[![image](https://lh3.googleusercontent.com/-t1DCC858D8E/VU4DWiTJqjI/AAAAAAAADJU/do6GDegL4sA/image_thumb%25255B2%25255D.png?imgmax=800 "image")](https://www.blogger.com/blog/post/edit/6673695286148904603/9177339531041529534#)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTcyMzA2MjQ2M119
-->