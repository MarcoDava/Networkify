"""
Generates personalized outreach messages using OpenAI.
"""
from openai import OpenAI
from config import settings

client = OpenAI(api_key=settings.openai_api_key)

def generate_outreach_message(
    user: dict,
    target_person: dict,
    target_company: str,
    context: dict
) -> str:
    bridge = context.get("bridge_person")
    is_recruiter = target_person.get("is_recruiter", False)

    prompt = f"""
You are helping {user['name']} write a warm LinkedIn outreach message.

Sender background:
- Current/past companies: {', '.join(user.get('companies', []))}
- Schools: {', '.join(user.get('schools', []))}
- Title: {user.get('title', 'Professional')}

Recipient:
- Name: {target_person['name']}
- Title: {target_person.get('title', 'Unknown')}
- Company: {target_company}
- Is recruiter: {is_recruiter}
{"- Mutual connection: " + bridge['name'] if bridge else ""}

Write a concise, warm, non-generic LinkedIn message (under 150 words).
{"Focus on referral request." if not is_recruiter else "Focus on expressing interest in open roles."}
{"Mention the mutual connection " + bridge['name'] + " naturally." if bridge else ""}
Do not use hollow phrases like 'I hope this message finds you well'.
Return only the message text, no subject line.
"""

    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
        temperature=0.7
    )
    return response.choices[0].message.content.strip()
