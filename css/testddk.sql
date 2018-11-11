CREATE MATERIALIZED VIEW "V_Top_20_CUSTOMERS"
AS
SELECT "c"."CustomerId", ("UnitPrice" * "Quantity") AS "TotalAmt"
FROM
(SELECT "Customer"."CustomerId", "FirstName", "LastName", "InvoiceId"
	FROM public."Customer"
	JOIN 
	public."Invoice"
	ON public."Customer"."CustomerId" = public."Invoice"."CustomerId") c
	JOIN public."InvoiceLine"
	ON c."InvoiceId" = "InvoiceLine"."InvoiceId"
	GROUP BY "CustomerId", "TotalAmt"
	ORDER BY "TotalAmt" DESC LIMIT 20
WITH NO DATA;

REFRESH MATERIALIZED VIEW "V_Top_20_CUSTOMERS";


CREATE UNIQUE INDEX cust_idx ON "V_Top_20_CUSTOMERS"("CustomerId");

REFRESH MATERIALIZED VIEW CONCURRENTLY "V_Top_20_CUSTOMERS";
