f=open("faqs.txt","r")
faq=f.read()
# print(faq)

question=input("Ask a qustion")

# print("\n Questions:")
# print(question)

# print("\n Faqs:")
# print(data)

# # f strings
# name="alfiya"
# age=20
# message=f"hello my name is {name} and my age is {age}"
# #print(message)

# a=17
# b=8
# sum=f"sum is {a+b}"
# # print(sum)

# name=input("Enter ur name")
# # print(f"hello {name}")


################
prompt=f"""
You are customer support assistant.

FAQs:
{faq}

Question:
{question}

ans:
"""

print(prompt)



